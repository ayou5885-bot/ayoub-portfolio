export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
}

export const projects: Project[] = [
  {
    id: "nomad",
    name: "Nomad",
    category: "Mobility Website",
    description:
      "A mobility-focused website built around cycle and urban transit concepts, with a clean interface for discovering transportation options.",
    url: "https://nomad-p9we.vercel.app/",
    image:
      "https://images.pexels.com/photos/13344226/pexels-photo-13344226.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Person riding an electric bicycle through a city street",
  },
  {
    id: "laptophub",
    name: "LaptopHub",
    category: "E-commerce",
    description:
      "A laptop e-commerce store featuring product browsing, filtering, and a storefront experience for browsing laptop inventory.",
    url: "https://laptop-e-commerce-store.vercel.app/",
    image:
      "https://images.pexels.com/photos/25589787/pexels-photo-25589787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Sleek laptop on a white desk in a contemporary office setting",
  },
  {
    id: "volt",
    name: "Volt Hardware Store",
    category: "E-commerce",
    description:
      "A hardware store e-commerce site presenting tools and supplies with a catalog-style browsing experience.",
    url: "https://volt-last-one.vercel.app/",
    image:
      "https://images.pexels.com/photos/735338/pexels-photo-735338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Hardware store interior with assorted tools and merchandise on shelves",
  },
  {
    id: "ayo-fashion",
    name: "AYO-FASHION",
    category: "Fashion E-commerce",
    description:
      "A fashion e-commerce storefront showcasing apparel with a minimalist, editorial-leaning product presentation.",
    url: "https://ayo-fashion.vercel.app/",
    image:
      "https://images.pexels.com/photos/7871177/pexels-photo-7871177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Elegant fashion model posing in a minimalist studio setting",
  },
  {
    id: "ironclad-auto",
    name: "Ironclad Auto",
    category: "Automotive / Service Website",
    description:
      "A car service website presenting automotive repair and maintenance offerings with a clean, service-oriented layout.",
    url: "https://car-service-web-six.vercel.app/",
    image:
      "https://images.pexels.com/photos/33814734/pexels-photo-33814734.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Interior of an automotive repair shop with cars undergoing maintenance",
  },
];
