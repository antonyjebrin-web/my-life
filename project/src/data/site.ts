// Shared site data — content for cards, hotels, food, reviews, faqs, etc.

export const SITE = {
  name: 'Explore Kanyakumari',
  phone: '+91 90434 35765',
  phoneRaw: '+919043435765',
  whatsapp: '919043435765',
  email: 'ajexplorer.in@gmail.com',
  instagram: 'https://instagram.com/ajexplorer.in',
  facebook: 'https://facebook.com',
  maps: 'https://www.google.com/maps/place/Kanyakumari',
};

const IMG = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'food', label: 'Food' },
  { id: 'planner', label: 'Trip Planner' },
  { id: 'blog', label: 'Blog' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const TRUST_BADGES = [
  'Trusted Local Assistance',
  'Honest Recommendations',
  'Budget to Luxury',
  '24/7 Support',
];

export const QUICK_ACTIONS = [
  { title: 'Book Hotel', icon: 'Building', desc: 'Verified stays for every budget', href: '#hotels' },
  { title: 'Book Cab', icon: 'Car', desc: 'Local drivers, fair prices', href: '#planner' },
  { title: 'Boat Ride', icon: 'Sailboat', desc: 'Sunrise & sunset on the sea', href: '#planner' },
  { title: 'Find Food', icon: 'UtensilsCrossed', desc: 'Seafood to street food', href: '#food' },
  { title: 'Create Itinerary', icon: 'Map', desc: 'Plan your perfect days', href: '#planner' },
  { title: 'Emergency Help', icon: 'LifeBuoy', desc: 'Quick contacts & support', href: '#emergency' },
];

export const WHY_US = [
  { title: 'Local Experts', icon: 'Users', desc: 'Born and raised in Kanyakumari, we know every corner and the best times to visit.' },
  { title: 'Verified Partners', icon: 'BadgeCheck', desc: 'Every hotel, cab and boat operator is personally checked by our team.' },
  { title: 'Transparent Pricing', icon: 'Receipt', desc: 'No hidden charges. You see the real price before you book anything.' },
  { title: 'Fast WhatsApp Support', icon: 'MessageCircle', desc: 'Message us anytime — most replies come back within minutes.' },
  { title: 'Personalized Planning', icon: 'Sparkles', desc: 'Your trip is built around your interests, pace and budget — not a template.' },
  { title: 'Trusted by Travelers', icon: 'HeartHandshake', desc: 'Hundreds of happy families, couples and solo explorers recommend us.' },
];

export const EXPERIENCES = [
  { title: 'Sunrise Tour', desc: 'Watch the first light of India over three seas.', img: IMG(1438564), tag: 'Signature' },
  { title: 'Sunset Tour', desc: 'Golden hour from the southernmost tip.', img: IMG(1001682), tag: 'Popular' },
  { title: 'Vivekananda Rock', desc: 'Ferry to the memorial where Swami Vivekananda meditated.', img: IMG(1032650) },
];

export const HOTEL_CATEGORIES = [
  {
    name: 'Budget Hotels',
    desc: 'Clean, comfortable Kanyakumari stays from ₹1,500/night.',
    img: '/budgethotel.jpg',
    location: 'Near town and local markets',
    price: '₹1,500 – ₹2,500',
  },
  {
    name: 'Family Hotels',
    desc: 'Spacious rooms and kid-friendly amenities for groups.',
    img: '/family.jpg',
    location: 'Close to beaches and family dining',
    price: '₹2,500 – ₹4,000',
  },
  {
    name: 'Sea View Hotels',
    desc: 'Wake up to sunrise views over the Bay of Bengal.',
    img: '/beachside.jpg',
    location: 'Oceanfront promenade',
    price: '₹4,000 – ₹6,500',
  },
  {
    name: 'Premium Hotels',
    desc: 'Thoughtful service, modern comforts and premium dining.',
    img: '/lux.jpg',
    location: 'Prime city locations',
    price: '₹6,500 – ₹9,000',
  },
  {
    name: 'Luxury Resorts',
    desc: 'Private pools, spa treatments and ultimate relaxation.',
    img: '/luxer.jpg',
    location: 'Beachside resorts',
    price: '₹9,000+',
  },
];

export const FOOD_GUIDE = [
  { name: 'Best Seafood', icon: 'Fish', desc: 'Fresh catch grilled, fried and curried.', img: '/seafood.png' },
  { name: 'Best Vegetarian', icon: 'Leaf', desc: 'Pure-veg restaurants with South Indian thalis.', img: '/veg food.png' },
  { name: 'Traditional Tamil Food', icon: 'Soup', desc: 'Banana leaf meals and spicy home-style curry.', img: '/trfood.png' },
  { name: 'Budget Food', icon: 'Wallet', desc: 'Filling meals under ₹150.', img: '/budgetfood.png' },
  { name: 'Premium Dining', icon: 'Wine', desc: 'Fine-dine with sea views.', img: '/premium.png' },
];

export const REVIEWS = [
  { name: 'Ananya Sharma', place: 'Bengaluru', rating: 5, text: 'Felt completely safe as a solo female traveler. They replied on WhatsApp in minutes and planned every detail. The sunrise tour was magical.' },
  { name: 'Rahul & Meera', place: 'Mumbai', rating: 5, text: 'Honest recommendations — they told us which hotel to skip and which to pick. The sea-view room was perfect for our anniversary.' },
  { name: 'Joseph Thomas', place: 'Kochi', rating: 5, text: 'The boat ride and village experience felt authentic, not touristy. Pricing was transparent and there were no surprises.' },
  { name: 'Deepak Verma', place: 'Delhi', rating: 4, text: 'Great local knowledge. They adjusted our plan when it rained and still made the day memorable.' },
  { name: 'Fatima Sheikh', place: 'Hyderabad', rating: 5, text: 'Family of six, including grandparents. They handled everything — cab, food, accessible hotels. Truly 24/7 support.' },
  { name: 'Karthik R', place: 'Chennai', rating: 5, text: 'The hidden beaches were unreal. You can tell these are real locals who love their town.' },
];

export const BLOG_POSTS = [
  { title: 'Best Hotels in Kanyakumari', category: 'Hotels', img: IMG(15286, 800), read: '6 min' },
  { title: 'Best Restaurants & Local Food', category: 'Food', img: IMG(1640777, 800), read: '7 min' },
  { title: 'Best Sunset Spots', category: 'Guides', img: IMG(1438564, 800), read: '4 min' },
  { title: 'Best Sunrise Guide', category: 'Guides', img: IMG(1001682, 800), read: '5 min' },
  { title: 'Hidden Places Locals Love', category: 'Hidden', img: IMG(189349, 800), read: '8 min' },
];

export const FAQS = [
  { q: 'Is Kanyakumari safe for solo and family travelers?', a: 'Yes. Kanyakumari is one of the safest coastal towns in South India. We personally verify every partner and are available on WhatsApp 24/7 for any support you need.' },
  { q: 'Do you charge any booking fees or commissions?', a: 'No. Our recommendations are free and honest. You pay only the hotel or operator directly, at transparent prices with no hidden charges.' },
  { q: 'How do I book a hotel or cab through you?', a: 'Just message us on WhatsApp with your dates and needs. We share verified options with real prices, and you confirm directly with the partner.' },
  { q: 'Can you customize a trip for my budget?', a: 'Absolutely. From budget backpackers to luxury stays, we build your plan around your budget, interests and pace — not a fixed package.' },
  { q: 'What is the best time to visit Kanyakumari?', a: 'October to March is ideal with pleasant weather. Sunrise and sunset are spectacular year-round. We adjust plans during monsoon for the best experience.' },
  { q: 'How fast do you respond on WhatsApp?', a: 'Typically within a few minutes during the day, and we have overnight coverage for emergencies. You are never left waiting.' },
];

export const EMERGENCY = [
  { label: 'Tourist Police', number: '100', icon: 'ShieldCheck' },
  { label: 'Ambulance', number: '108', icon: 'Truck' },
  { label: 'Hospital', number: '04652-246100', icon: 'Stethoscope' },
  { label: 'Medical Shops', number: '04652-255200', icon: 'Pill' },
  { label: 'ATM', number: 'Near Bus Stand', icon: 'CreditCard' },
  { label: 'Mechanic', number: '+91 98765 12345', icon: 'Wrench' },
];

export const MAP_PINS = [
  { label: 'Hotels', icon: 'BedDouble' },
  { label: 'Restaurants', icon: 'UtensilsCrossed' },
  { label: 'Tourist Places', icon: 'Camera' },
  { label: 'Hospitals', icon: 'Stethoscope' },
  { label: 'ATM', icon: 'CreditCard' },
  { label: 'Parking', icon: 'CircleParking' },
  { label: 'Police', icon: 'ShieldCheck' },
  { label: 'Fuel Station', icon: 'Fuel' },
];

export const GALLERY = [
  '/river.png',
  '/kaniyakumari cap.png',
  '/kalimala.png',
  '/கன்னியாகுமரி....mp4',
];

export const LOCAL_EVENTS = [
  { month: 'Jan', name: 'Pongal Celebrations', desc: 'Four days of harvest festivals across the town.' },
  { month: 'Apr', name: 'Kumari Amman Temple Festival', desc: 'Colorful processions and rituals by the sea.' },
  { month: 'Aug', name: 'Independence Sunrise Gathering', desc: 'Hundreds gather for sunrise at India\'s tip.' },
  { month: 'Oct', name: 'Navaratri', desc: 'Nine nights of music, dance and decorated dolls.' },
  { month: 'Dec', name: 'Christmas Beach Fair', desc: 'Local food, music and lights along the coast.' },
];

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi! I'd like to plan a trip to Kanyakumari.")}`;
