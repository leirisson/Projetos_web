import { ProductCard } from "../components/ProductCard";
import { useCart } from "../cart/CartContext";

export function Home() {
  const { addItem } = useCart()
  const products = [
    {
      id: 'p1',
      title: 'Hambúrguer Clássico',
      description: 'Pão, carne 150g, queijo, alface, tomate e maionese',
      price: 29.9,
      imageUrl:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p2',
      title: 'Hambúrguer Duplo',
      description: 'Dois smash 100g, queijo cheddar e molho da casa',
      price: 39.9,
      imageUrl:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p3',
      title: 'Batata Frita',
      description: 'Porção de batatas crocantes com sal',
      price: 19.9,
      imageUrl:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p4',
      title: 'Refrigerante Lata',
      description: 'Lata 350ml gelada',
      price: 7.9,
      imageUrl:
        'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'
    }
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-center justify-items-center">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              description={p.description}
              price={p.price}
              imageUrl={p.imageUrl}
              onAdd={() => addItem({ id: p.id, title: p.title, price: p.price, imageUrl: p.imageUrl })}
            />
          ))}
        </div>
      </div>
    </>
  )
}
