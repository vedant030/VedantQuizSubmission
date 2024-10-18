import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { revalidatePath } from 'next/cache'
import redis from '@/lib/redis'

async function submitScore(formData: FormData) {
  'use server'
  const name = formData.get('name') as string
  const score = formData.get('score') as string
  await redis.zadd('leaderboard', parseInt(score), name)
  revalidatePath('/result')
}

async function getLeaderboard() {
  const leaderboard = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES')
  const formattedLeaderboard = []
  for (let i = 0; i < leaderboard.length; i += 2) {
    formattedLeaderboard.push({ name: leaderboard[i], score: leaderboard[i + 1] })
  }
  return formattedLeaderboard
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const score = searchParams.score ? Number(searchParams.score) : 0
  const total = searchParams.total ? Number(searchParams.total) : 0
  const leaderboard = await getLeaderboard()

  const rankEmoji = (index: number) => {
    switch (index) {
      case 0: return "🥇"
      case 1: return "🥈"
      case 2: return "🥉"
      default: return `${index + 1}.`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-6xl font-bold text-blue-600">{score}</span>
            <span className="text-2xl text-gray-500">/{total}</span>
          </div>
          
          <form action={submitScore} className="space-y-4">
            <Input type="text" name="name" placeholder="Enter your name" required className="border-gray-300" />
            <Input type="hidden" name="score" value={score} />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Submit Score</Button>
          </form>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200">
                    <span className="flex items-center">
                      <span className="w-8 text-lg">{rankEmoji(index)}</span>
                      <span>{entry.name}</span>
                    </span>
                    <span className="font-semibold">{entry.score}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Button asChild className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
            <Link href="/">Take Another Quiz</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}