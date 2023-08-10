<template>
  <div class="essay-container">
    <div class="essay">
      <span @click="handleEssay">x</span>
      <h1>Experience</h1>
      <p>
        First of all, I integrate googleOAuth with Nuxt-vue3-google-signin
        module. After users log in, the application will automatically store the
        access token in cookie to keep users' current state, and delete cookie
        when they click logout button. I used to implement googleOAuth into
        other application with the integration of Supabase, which in my opinion
        is a way more convenient experience than this time, since it not only
        can use multiple ways to log in, but also easily track user’s data and
        even send verification letter to the user without complex coding.
      </p>
      <p>
        In this application, the main function is searching products. I use
        axios to fetch all the products, details, categories, and brands of each
        category from dummydata api, then filter the received product data with
        queries, and finally wrap all of them into composables. I store filtered
        product data into a global state, which allows me to use the same data
        in every page and component. With them, I manage to build a side bar as
        filters to optionally display different types of products and allow
        users to check the details of each.
      </p>
      <p>
        To optimize the performance of application, using virtual list is
        inevitable. With the help of vueuse module, I can easily set a list with
        efficient storage while the product data might have large amounts.But
        since it’s the first time I apply this function, it takes me quite some
        time to settle everything down.
      </p>
      <p>
        However, there’re still difficulties especially in the search page. At
        first, I use watchEffect to monitor the changes of all the queries,
        which works well with “useFetch” in my other application. But when it
        comes to axios, the fetch process becomes an infinite loop and cause to
        the error of 429(too many requests). To fix this problem, I turn to use
        “computed” to monitor all the queries while using“watch” and set the
        dependencies manually. Also, due to the new way of monitor, the queries
        become reactive, causing to some minor changes in the fetch data
        composable. Even though this really takes me a lot of time to figure
        everything out, it’s still a precious experience to solve a complex
        problem independently, and luckily, I manage to do it all!
      </p>
    </div>
  </div>
</template>

<script setup>
const { handleEssay } = useEssay();
</script>

<style>
.essay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(182, 182, 182, 0.9);
  backdrop-filter: blur(5px);
}

.essay {
  width: 120rem;
  height: 80rem;
  background-color: #f2e0b5;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 4.6rem;
  border-radius: 10px;
}
.essay h1 {
  font-size: 4.2rem;
  text-align: center;
  color: #897340;
}

.essay p {
  font-size: 2.2rem;
}

.essay span {
  display: block;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 4rem;
  padding: 0 1rem;
  color: #897340;
}
</style>
