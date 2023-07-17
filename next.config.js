/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  
  // redirection
  // url이 바뀌었는지 user 가 알게 된다.
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false, //브라우저나 검색엔진이 이 정보 기억할 것이냐?
      }
    ]
  },
  
  // url 바뀌지 않아서 user 가 모른다 => api key 숨기는 데 요긴하게 사용됨
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      {
        source: "/api/movies/:id",
        // 이 요청은 사용자가 /api/movies/1211 와 같은 경로로 접근했을 때 실행될 것
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
        // :id 로 source 와 destination 에 들어가는 명칭 동일하게 해줘야 한다
      }
    ];
  }
}

module.exports = nextConfig
