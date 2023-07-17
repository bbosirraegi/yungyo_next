import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    // 클릭하면 영화의 id 받아서 이동해줄 것
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
      // 배열로 movie의 포스터 들고오기
        <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
        {/* onClick 통해서 이동하는데 영화의 id 사용 */}
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          {/* movies 는 poster path 가 있고, 이것을 사용하려면 
              앞쪽 url 쓴 후에 poster path 들여와야한다. */}
          <h4>
            <Link href={`/movies/${movie.original_title}/${movie.id}`}>{movie.original_title}</Link>
            {/* 영화 제목 클릭하면 href 형식 따라서 링크 이동 */}
          </h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  ); 
}

export async function getServerSideProps() { //이름은 무조건 getServerSideProps 로
  // 이 자리에 어떤 코드를 쓰던지 간에 모두 서버에서 돌아가게 될 것이다!
  // 무조건 백엔드에서만 동작함
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
      // 이 results 라는 데이터는 Home({results}) 로 가져온다
      // 여기서 무엇을 return 하던지, 이걸 props(연결 매개체)로써 page에게 주게 된다.(Home({results}))
    },
  };
}