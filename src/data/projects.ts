export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
}

// HOW TO EDIT
// - Images: put the file in  public/images/  and write the path as "/images/<file name>".
// - Descriptions: change the `description` text of the project you want.
// - The first project in the list is shown larger than the others.
export const projects: Project[] = [
  {
    id: "nomad",
    name: "AYO-CYCLE",
    category: "Electric Bikes",
    description:
      "A brand website for an urban electric bike, with a clean editorial layout that presents the bike's features, technology and lifestyle.",
    url: "https://nomad-p9we.vercel.app/",
    image: "/images/nomand.png",
    imageAlt:
      "AYO-CYCLE homepage showing a black electric bike beside a list of its key features",
  },
  {
    id: "laptophub",
    name: "LaptopHub",
    category: "E-commerce",
    // TODO: review this description — it was written from the site link only.
    description:
      "A laptop e-commerce store featuring product browsing, filtering, and a storefront experience for browsing laptop inventory.",
    url: "https://laptop-e-commerce-store.vercel.app/",
    // TODO: take a screenshot of the site, save it as public/images/laptophub.png,
    // then change this line to:  image: "/images/laptophub.png",
    image:
      "https://images.pexels.com/photos/25589787/pexels-photo-25589787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Sleek laptop on a white desk in a contemporary office setting",
  },
  {
    id: "volt",
    name: "Volt",
    category: "Computer Hardware Store",
    description:
      "An online store for PC components, peripherals and gaming systems, with a bold dark interface, shop and category browsing, search and a cart.",
    url: "https://volt-last-one.vercel.app/",
    image: "/images/hardware.png",
    imageAlt:
      "Volt homepage with a dark gaming PC background and Shop Now and Explore Gaming PCs buttons",
  },
  {
    id: "ayo-fashion",
    name: "AYO-FASHION",
    category: "Fashion E-commerce",
    // TODO: review this description — it was written from the site link only.
    description:
      "A fashion e-commerce storefront showcasing apparel with a minimalist, editorial-leaning product presentation.",
    url: "https://ayo-fashion.vercel.app/",
    // TODO: take a screenshot of the site, save it as public/images/ayo-fashion.png,
    // then change this line to:  image: "/images/ayo-fashion.png",
    image:
      "https://images.pexels.com/photos/7871177/pexels-photo-7871177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    imageAlt: "Elegant fashion model posing in a minimalist studio setting",
  },
  {
    id: "ironclad-auto",
    name: "Ironclad Auto",
    category: "Car Service",
    description:
      "A car repair and maintenance website built around open diagnostics, certified technicians and written estimates, with a clear book-a-bay call to action.",
    url: "https://car-service-web-six.vercel.app/",
    image: "/images/carservice.png",
    imageAlt:
      "Ironclad Auto homepage with the headline Every repair, diagnosed in the open and a car diagnostic diagram",
  },
];
