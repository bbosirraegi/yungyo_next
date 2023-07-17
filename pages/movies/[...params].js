import Seo from "@/components/Seo";
import { useRouter } from "next/router";

export default function Detail({params}) {
    const router = useRouter();
    console.log(router);

    const [title, id] = params;
    // title 과 id 라는 2개의 params 를 가졌다는 것을 알고 있기 때문에 배열을 [title, id] 로 설정

    return (
        <div>
            <Seo title={title} />
            {/* 라우터를 통해서 title 정보가 넘어오게 되므로 이를 이용해 페이지에 제목 보여주기 */}
            <h4>{ title || "Loading..." }</h4>
        </div>
    );
}

export function getServerSideProps({ params: { params } }) {
    // 서버(백엔드)에 있는 params 정보 가져오기
    return {
        props: {
            params,
        }
    }
}