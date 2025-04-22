// components/home/PopularCoursesSection.tsx
import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES } from "@/lib/queries";
import PopularCoursesClient from "./PopularCoursesClient";
import { Course } from "@/types/course";

interface GetCoursesResponse {
  courses: Course[];
}

export default async function PopularCoursesSection() {
  // Informamos a TS de la forma de la respuesta
  const data = await graphQLClient.request<GetCoursesResponse>(GET_COURSES);
  const courses = data.courses.slice(0, 3);

  return <PopularCoursesClient courses={courses} />;
}
