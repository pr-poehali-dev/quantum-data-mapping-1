import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Мы работаем в Омске и по всей Омской области. За годы работы реализовали более 150 проектов в регионе — от небольших дачных домиков до полноценных загородных резиденций.",
  },
  {
    question: "Сколько времени займёт строительство?",
    answer:
      "Мы строим дом под ключ за 3 месяца. Это возможно благодаря заводскому изготовлению SIP-панелей с точными размерами и отлаженной технологии монтажа. Для сравнения: кирпичный или газобетонный дом такой же площади строится 1–2 года.",
  },
  {
    question: "Можно ли купить дом в ипотеку?",
    answer:
      "Да. Мы аккредитованы в ведущих банках, поэтому вы можете оформить ипотеку на строительство дома. Наши менеджеры помогут с выбором программы и сбором документов — просто позвоните нам.",
  },
  {
    question: "Можно ли строить поэтапно, если бюджет ограничен?",
    answer:
      "Конечно. Мы гибко подходим к каждому клиенту: строим как полностью под ключ, так и поэтапно — под ваш текущий бюджет. Например, сначала возводим коробку и кровлю, затем делаем инженерию и отделку. Обсудим удобный для вас формат на консультации.",
  },
  {
    question: "Чем SIP-дом лучше кирпичного или из газобетона?",
    answer:
      "SIP-панели обеспечивают теплоизоляцию в 3–4 раза эффективнее кирпича — это критично для омского климата. Счета за отопление ниже на 40–70%. При этом конструкция значительно легче, что означает более простой и дешёвый фундамент. Срок службы — более 80 лет без усадки и деформаций.",
  },
  {
    question: "Вы получали какие-либо награды или признание?",
    answer:
      "Да, наша компания — победитель профессиональных строительных конкурсов и неоднократно освещалась в региональных и федеральных СМИ. Мы входим в число лидеров рынка индивидуального строительства по Омской области.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы и ответы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
