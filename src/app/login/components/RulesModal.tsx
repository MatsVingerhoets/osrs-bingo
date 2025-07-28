import Image from "next/image"

type Props = {
  toggle: () => void
}
const RulesModal = ({ toggle }: Props) => {
  return (
    <div className="relative h-screen w-screen" onClick={toggle}>
      {/* semi‑opaque backdrop */}
      <div className="absolute inset-0 bg-gray-900/90 z-0" />

      {/* center the scroll */}
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        <div
          className="relative aspect-[4/5] w-[50rem] overflow-hidden rounded-lg"
          onClick={e => e.stopPropagation()}
        >
          {/* 1) The scroll background */}
          <Image
            src="/scrollFinal.png"
            alt="Torn parchment scroll"
            fill
            priority
            className="object-cover object-center"
          />

          {/* 2) Text overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl font-serif font-bold text-[#3B2E1A]">
              Your Title Here
            </h2>
            <p className="mt-4 text-lg font-serif text-[#3B2E1A]">
              Put whatever content you like here. It will sit right on the scroll.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RulesModal
