import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";

export default function index({ icon, title, amount }: { icon: React.ReactNode, title: string, amount: number}) {
  return (
    <div className="w-[19rem] h-[6.2rem] flex flex-col border-2 border-slate-200 rounded-md ">
        <div className="w-full h-full flex items-center gap-4 p-[10px]">
            <div className="p-[5px] border-2 border-slate-200 rounded-md">
                {icon}
            </div>
            <div className="flex flex-col ">
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <p className="text-slate-700 font-semibold">{amount}</p>
            </div>
        </div>
        <div className="w-full h-full bg-slate-50 border-t-2 border-slate-200">
            <Link 
                href="#" 
                className="ml-3 text-sm font-medium text-blueSecundary flex items-center w-fit"
                >
                Ver detalhes
                <TiArrowRight className="text-2xl text-blueSecundary mt-[2px]" />
            </Link>
        </div>
    </div>
  )
}   
