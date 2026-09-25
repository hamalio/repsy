export type TheorySection = {
  title: string
  text: string
  // The article in [brackets] is highlighted: "I saw [an] elephant."
  examples: string[]
}

export type Theory = {
  intro: string
  sections: TheorySection[]
  // Short checklist to pick the answer, shown last
  steps: string[]
}
