import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES } from "@/lib/queries";
import PopularCoursesClient from "./PopularCoursesClient";

export default async function PopularCoursesSection() {
  const data = await graphQLClient.request(GET_COURSES);
  const courses = data.courses.slice(0, 3);

  return <PopularCoursesClient courses={courses} />;
}
