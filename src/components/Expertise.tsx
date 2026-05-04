import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Проектирование под ключ",
    description: "Разрабатываем индивидуальный проект с нуля или адаптируем готовый. Учитываем ваш участок, бюджет и образ жизни. Все согласования — на нас.",
    icon: "FileText",
  },
  {
    title: "Производство SIP-панелей",
    description:
      "Панели изготавливаются на собственном производстве с точностью ±1 мм. Заводской контроль качества на каждом этапе. Никаких сюрпризов на стройке.",
    icon: "Factory",
  },
  {
    title: "Строительство дома",
    description:
      "Бригады со специализацией именно на SIP-технологии. Чёткие сроки, прозрачный контроль через фотоотчёты. Сдаём объект в срок — это наш стандарт.",
    icon: "HardHat",
  },
  {
    title: "Отделка и сдача",
    description:
      "Выполняем полный цикл — от фундамента до чистовой отделки. Дом сдаётся готовым к жизни. Гарантия на конструктив — 10 лет.",
    icon: "Home",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Полный цикл</HighlightedText> — от
            <br />
            проекта до ключей
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Мы не просто строим — мы создаём дом вашей мечты с технологией, которой доверяют в 50 странах мира. Каждый этап под нашим контролем.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon name={area.icon} size={40} className="mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
