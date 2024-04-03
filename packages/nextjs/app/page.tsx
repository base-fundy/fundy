"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage: "url(/hero.svg)" }}>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md"></div>
        </div>
      </div>
      <div className="w-full flex items-center flex-col py-20">
        <pre className="w-2/3 m-auto p-0 whitespace-pre-wrap">
          {`
Gnomish

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
          `}
        </pre>
        <a href="https://x.com/gnomish_eth" className="btn btn-ghost bg-purple-500 hover:bg-purple-300">
          Follow on X
        </a>
      </div>
    </>
  );
};

export default Home;
