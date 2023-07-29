import { db } from "@/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

const Feed = async () => {
  const q = query(collection(db, "newsPosts"));
  const querySnapshot = await getDocs(q);
  const fetchedProducts = querySnapshot?.docs?.map((doc) => {
    return doc.data();
  });
  return (
    <section class="text-gray-600 body-font overflow-hidden max-w-5xl mx-auto">
      <div class="container px-5 py-24 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
          {fetchedProducts?.map((e) => {
            return (
              <div key={e} class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">
                    Date
                  </span>
                  <span class="mt-1 text-gray-500 text-sm">{e?.timestamp?.toDate().toDateString()}</span>
                </div>
                <div class="md:flex-grow">
                  <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                   {e.title}
                  </h2>
                  <p class="leading-relaxed">
                   {e.shortDesc}
                  </p>
                  <a class="text-indigo-500 inline-flex items-center mt-4">
                    Learn More
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feed
