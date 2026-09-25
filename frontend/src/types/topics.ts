export type TopicProgress = {
  ease_factor: number
  interval_days: number
  repetitions: number
  next_review_at: string | null
  last_review_at: string | null
}

export type Topic = {
  id: number
  slug: string
  title: string
  position: number
  progress: TopicProgress | null // null = the user has not started the topic
}

export type TopicStatus =
  | { kind: "new" }
  | { kind: "due", overdueDays: number }
  | { kind: "scheduled", inDays: number }
