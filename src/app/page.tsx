"use client"
import ImagePainter from "@/app/components/ImagePainter";
import {useAppSelector} from "@/lib/hooks";


export default function Home() {
  const {isStatusBar} = useAppSelector(state => state.view)
  return (
    <main className='position-relative' style={{ minHeight: `calc(100vh - ${isStatusBar ? '248px': '205px'})` }}>
          <ImagePainter/>
    </main>
  );
}
