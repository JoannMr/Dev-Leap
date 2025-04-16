"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "ElTitoDry",
    avatar: "/images/eltitodry.jpg",
    description:
      "Soy un desarrollador full stack, pero mi verdadera pasión es el frontend. Disfruto creando interfaces modernas y atractivas, y siempre estoy en la búsqueda de nuevas tecnologías que me ayuden a mejorar mis proyectos. Además, soy un gran fan de la inteligencia artificial y me encanta explorar cómo esta puede transformar la experiencia digital.",
  },
  {
    id: 2,
    name: "DylanDev",
    avatar: "/images/dylan.jpg",
    description: "Experto en React y amante del diseño UI/UX minimalista.",
  },
];

export default function TeamMotion() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-12 px-4 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text"
        >
          El equipo de DevLeap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-2 text-gray-600"
        >
          Conoce a las personas que hacen posible DevLeap
        </motion.p>

        <div className="mt-8 grid gap-15 md:grid-cols-2 lg:grid-cols-2">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-base text-gray-600 mt-2">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
