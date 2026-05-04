import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Энергоэффективность класса A+",
    description:
      "SIP-панели обеспечивают теплосопротивление в 3–4 раза выше, чем традиционные материалы. Ваш дом потребляет минимум энергии, а счета за отопление снижаются до 70%.",
  },
  {
    title: "Скорость без компромиссов",
    description:
      "Коробка дома возводится за 2–4 недели. Полная готовность к отделке — за 1–2 месяца. Точные заводские допуски исключают строительный брак и переделки.",
  },
  {
    title: "Канадское качество в России",
    description:
      "Технология SIP зарекомендовала себя в условиях сурового канадского климата. Мы адаптировали её под российские реалии и нормативы, сохранив все преимущества.",
  },
  {
    title: "Долговечность и надёжность",
    description:
      "Срок службы SIP-дома — более 80 лет. Панели не гниют, не деформируются и устойчивы к влаге. Конструкция выдерживает сейсмические нагрузки и ураганный ветер.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Технология SIP</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Строим умно
              <br />
              <HighlightedText>и быстро</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Строительство дома по технологии SIP"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              SIP-панель — это инженерный сэндвич из OSB-плит и пенополистирола. Прочно, тепло и точно. Именно так строит Канада, Скандинавия и весь цивилизованный мир.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
