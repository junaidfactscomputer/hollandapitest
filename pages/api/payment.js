// export default function handler(req, res) {
//   // res.status(200).json({ name: "John Doe" });
// }

const handler = async function (req, res) {
  // custom logic
  return res.redirect(307, "/login");
};

export default handler;

// In pages we can use

// import Router from 'next/router'

// let res = await fetch('api', {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
// if (res.status == 200) {
//    Router.push('/location')
// }
