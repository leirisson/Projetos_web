type Props = {
  title: string
  description: string
  price: number
  imageUrl: string
  onAdd?: () => void
}

export function ProductCard({ title, description, price, imageUrl, onAdd }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md max-w-sm w-full">
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-gray-50">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm backdrop-blur">
          R$ {price.toFixed(2)}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Adicionar ${title}`}
          className="mt-3 sm:mt-4 inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}
