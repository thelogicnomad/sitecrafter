export interface MockProduct {
        id: string;
        name: string;
        description: string;
        basePrice: number;
        imageUrl: string;
    }
    
    export const mockProducts: MockProduct[] = [
        {
            id: 'prod_01',
            name: 'Classic Chocolate Fudge',
            description: 'A rich and decadent chocolate cake with a creamy fudge frosting.',
            basePrice: 45,
            imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
        },
        {
            id: 'prod_02',
            name: 'Velvet Dream',
            description: 'A timeless red velvet cake with a smooth cream cheese frosting.',
            basePrice: 50,
            imageUrl: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop',
        },
        {
            id: 'prod_03',
            name: 'Lemon Zest Delight',
            description: 'A light and refreshing lemon cake with a tangy lemon glaze.',
            basePrice: 48,
            imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
        },
        {
            id: 'prod_04',
            name: 'Berry Chantilly',
            description: 'A delicate vanilla sponge layered with fresh berries and chantilly cream.',
            basePrice: 55,
            imageUrl: 'https://images.unsplash.com/photo-1562440102-8619a1072944?q=80&w=800&auto=format&fit=crop',
        }
    ];