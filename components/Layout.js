import NavBar from "./NavBar";

// children은 하나의 컴포넌트를 또 다른 컴포넌트 안에 넣을 때 사용
// 여기서 children 은 _app.js 의 <Layout> 태그 안에 내용을 뜻한다.
export default function Layout({children}) {
    return <>
        <NavBar />
        <div>{children}</div>
    </>
}