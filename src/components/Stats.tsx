import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "150+", label: "Реализованных проектов" },
  { value: "3", label: "Месяца — дом под ключ" },
  { value: "10", label: "Лет гарантии на конструктив" },
  { value: "80+", label: "Лет срок службы дома" },
]

const awards = [
  "Победитель профессиональных строительных конкурсов",
  "Публикации в региональных и федеральных СМИ",
  "Аккредитация в ведущих банках — ипотека доступна",
  "Строительство под ключ или поэтапно под бюджет",
]

export function Stats() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-primary-foreground/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-medium mb-2 text-primary-foreground">{stat.value}</div>
              <div className="text-primary-foreground/50 text-sm leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Awards / advantages */}
        <div className="grid md:grid-cols-2 gap-4">
          {awards.map((item, i) => (
            <div
              key={item}
              className={`flex items-start gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${400 + i * 80}ms` }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0" />
              <span className="text-primary-foreground/70 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
