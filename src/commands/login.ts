export default async function () {
  return {
    content: "Hello, world!",
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Authenticate",
            url: "https://google.com/",
          },
        ],
      },
    ],
  };
}
