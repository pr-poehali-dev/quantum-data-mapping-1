import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Чем SIP-дом лучше кирпичного или из газобетона?",
    answer:
      "SIP-панели обеспечивают теплоизоляцию в 3–4 раза эффективнее кирпича при вдвое меньшем весе конструкции. Это означает более лёгкий фундамент, быстрый монтаж и счета за отопление ниже на 40–70%. При этом прочность конструкции сопоставима с монолитом — дом выдерживает нагрузки в сейсмоопасных регионах.",
  },
  {
    question: "Сколько времени займёт строительство?",
    answer:
      "Коробка дома из SIP-панелей возводится за 2–4 недели в зависимости от площади. Полный цикл строительства «под ключ» — от фундамента до чистовой отделки — занимает 3–5 месяцев. Для сравнения: кирпичный дом аналогичной площади строится 1–2 года.",
  },
  {
    question: "Насколько долговечен SIP-дом?",
    answer:
      "Нормативный срок службы SIP-конструкции — более 80 лет. Панели не гниют, не подвержены усадке и деформации. В Канаде и США SIP-дома эксплуатируются уже более 50 лет без потери несущих характеристик. Мы даём гарантию на конструктив 10 лет.",
  },
  {
    question: "В каких регионах вы работаете?",
    answer:
      "Мы строим по всей России. Наши бригады работают в Московской, Ленинградской, Тверской, Калужской областях и других регионах. SIP-технология подходит для любого климата — от умеренного до сурового севера.",
  },
  {
    question: "Можно ли построить дом по своему проекту?",
    answer:
      "Да, это наша специализация. Мы проектируем каждый дом индивидуально, учитывая ваш участок, предпочтения и бюджет. Также можем адаптировать любой готовый проект под технологию SIP. Проектирование входит в стоимость при заказе строительства.",
  },
  {
    question: "Как начать и сколько это стоит?",
    answer:
      "Начните с бесплатной консультации — расскажите о желаемой площади, этажности и участке. Мы рассчитаем смету и предложим варианты планировок. Стоимость зависит от площади и комплектации: строительство «под ключ» начинается от 45 000 ₽/м². Свяжитесь с нами — и мы подготовим точный расчёт за 48 часов.",
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
