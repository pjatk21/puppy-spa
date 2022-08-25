import { Alert, Button, Spinner } from 'flowbite-react'
import { ReactNode } from 'react'
import { LoginButton } from 'src/components/login-btn'
import questions from 'src/pages/landing-page/faq.json'

function HeadBranding() {
  return (
    <div className="flex flex-col text-center gap-[20px]">
      <span className="text-[96pt]">🐶</span>
      <h1 className="text-5xl font-bold">Puppy</h1>
      <p>Plan zajęć o którym nie musisz myśleć</p>
      <div className="flex flex-row gap-2 justify-center">
        <Button href="/graphql">GraphQL</Button>
        <LoginButton />
        <Button>Github</Button>
        <Button>Altapi</Button>
      </div>
    </div>
  )
}

type QAProps = {
  question: ReactNode
  answer: ReactNode
}

function QA(props: QAProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-2xl font-bold">
        <b>Q: </b>
        {props.question}
      </h3>
      <p>
        <b>A: </b>
        {props.answer}
      </p>
    </div>
  )
}

function FAQ() {
  return (
    <div className="mt-10">
      <h2 className="text-center text-4xl font-semibold">FAQ</h2>
      <div className="grid grid-cols-3 gap-8 mt-10">
        {questions.map(({ q, a }, i) => (
          <QA key={i} question={q} answer={a} />
        ))}
        <QA
          question={'Na jakich technologiach jest oparty Puppy?'}
          answer={
            <ul className="list-disc list-inside px-4">
              <li>
                Aplikacja webowa
                <ul className="list-disc list-inside px-4">
                  <li>React</li>
                  <li>TailwindCSS feat. Flowbite</li>
                  <li>React-query</li>
                </ul>
              </li>
              <li>
                API
                <ul className="list-disc list-inside px-4">
                  <li>Nestjs feat. Apollo</li>
                  <li>Prisma feat. Postgres</li>
                </ul>
              </li>
            </ul>
          }
        />
      </div>
    </div>
  )
}

export function Landing() {
  return (
    <div className="bg-slate-800 w-screen min-h-screen px-20 pt-[10vh] text-white">
      <HeadBranding />
      <FAQ />
    </div>
  )
}
