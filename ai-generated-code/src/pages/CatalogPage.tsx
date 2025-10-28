import { mockProducts, MockProduct } from '@/services/mockData';
    import PageTransitionWrapper from '@/components/animation/PageTransitionWrapper';
    import { Link } from 'react-router-dom';
    
    const CatalogPage = () => {
      return (
        <PageTransitionWrapper>
          <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-center mb-12">Our Creations</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </PageTransitionWrapper>
      );
    };
    
    const ProductCard = ({ product }: { product: MockProduct }) => {
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-6">
                <h3 className="text-2xl font-bold font-serif mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">${product.basePrice}</span>
                    <Link to="/build" state={{ prefill: product }} className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105">
                        Customize
                    </Link>
                </div>
            </div>
        </div>
      );
    }
    
    export default CatalogPage;