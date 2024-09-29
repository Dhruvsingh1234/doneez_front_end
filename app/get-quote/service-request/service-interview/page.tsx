"use client"

import { useState } from "react"

import ServiceFooter from "@/app/footers/service_footer"
import ServiceHeader from "@/app/headers/ServiceHeader"
import ServiceItem from "./serviceitem"

export default function ServiceInterView(){
    const [tab, setTab] = useState(1);
    const [hover1, sethover1] = useState(false)
    const [hover2, sethover2] = useState(false)

    const handleSetTap = (index: number) => {
        if(index == 1){
            setTab(1)
        }else{
            setTab(2)
        }
        sethover1(false)
        sethover2(false)
    }

    return(
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <ServiceHeader progressNumber={1} progressTitle="SERVICES"/>

            <div className="flex-1 max-w-[1024px] w-full mx-auto px-4 py-8 max-sm:bg-white max-sm:max-w-[540px] max-sm:shadow-none max-sm:min-h-full max-sm:h-auto">
                <div className="flex flex-row items-center pb-4">

                    <button className="max-md:fixed max-md:left-[12px] max-md:top-[40px] max-md:translate-y-[-50%] flex items-center justify-center shadow-[0_2px_3px_0_#dce0e6] w-[40px] h-[40px] rounded-[50%] bg-white mr-4 text-[#788391]
                      active:border-solid active:border-red-300 active:border-[2px]">
                      {/* SVG Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Arrow-Left--Streamline-Feather"
                          className="w-5 h-5">
                          <path d="M11.76 4.850064000000001C11.628816 4.927944 4.901184000000001 11.660016 4.8426 11.772C4.775208 11.90088 4.775184 12.099072 4.842576 12.228C4.905768 12.348912 11.665992000000001 19.10628 11.781648 19.164144C11.91024 19.228512 12.158016 19.206072000000002 12.284136 19.118664C12.403824 19.035743999999998 12.504216000000001 18.848328 12.503471999999999 18.709296C12.502272 18.487344 12.573192 18.563328 9.461112 15.450000000000001L6.5162640000000005 12.504 12.661416 12.504L18.806568 12.504 18.928584 12.443208C19.004808 12.405216000000001 19.076352 12.345216 19.119287999999997 12.283248C19.18032 12.195192 19.188 12.163512 19.188 12C19.188 11.836488000000001 19.18032 11.804808000000001 19.119287999999997 11.716752C19.076352 11.654784 19.004808 11.594784 18.928584 11.556792L18.806568 11.496 12.661416 11.496L6.5162640000000005 11.496 9.461112 8.55C12.573192 5.436672 12.502272 5.512656 12.503471999999999 5.290704C12.504264 5.142744 12.402743999999998 4.960944 12.27036 4.873248C12.175128 4.810176 12.137832 4.8000240000000005 12.001896 4.800096C11.885088 4.800168 11.822136 4.8131520000000005 11.76 4.850064000000001" stroke="none" fill="currentColor" fillRule="evenodd" />
                      </svg>
                  </button>
                  <h1 className="text-[32px] font-bold">Choose Services.</h1>

                </div>
                <div className="flex flex-wrap shadow-[0_2px_4px_0_#d9dce9] rounded-[10px] max-md:shadow-none max-md:rounded-none bg-white">
                    <div className="w-2/3 max-md:w-full px-4">
                        <div className="px-4 py-8 max-sm:px-0 max-sm:py-4">

                            <div className="relative w-full sm:rounded-[4px] mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#788391] absolute z-[1] top-[49%] translate-y-[-55%] left-4 h-[1em]" viewBox="0 0 24 24" id="Search--Streamline-Ultimate" >
                                    <path d="M8.976 0.025248000000000003C6.649032 0.226632 4.422648 1.281192 2.8022400000000003 2.949552C1.594416 4.193112 0.731256 5.711208 0.324072 7.308C-0.319296 9.831 -0.003 12.344904 1.24008 14.588136000000002C2.464368 16.797504 4.564896 18.4896 6.9778080000000005 19.210248C9.115584 19.84872 11.367216 19.751592 13.44 18.931512C14.286287999999999 18.596688 15.361296 17.97036 15.984 17.449296C16.0566 17.388528 16.135584 17.323704 16.159512 17.305224000000003C16.199448 17.27436 16.475640000000002 17.543976 19.519512 20.585088C22.738176 23.800800000000002 22.840248000000003 23.900112 22.98 23.95164C23.585352 24.17484 24.17484 23.585352 23.95164 22.98C23.900112 22.840248000000003 23.800824000000002 22.7382 20.586216 19.520664C18.205344 17.137608 17.279376000000003 16.196136000000003 17.293416 16.172664C17.304144 16.154688 17.394984 16.0374 17.49528 15.912C18.283392 14.926608 18.882624 13.778328 19.223664 12.6C19.643208 11.150376 19.737744 9.632184 19.4976 8.200632C19.416096 7.7148 19.230936 6.975384000000001 19.11516 6.67332C19.097184000000002 6.6264 19.042896 6.48 18.994536 6.348C18.798864 5.813928000000001 18.426384 5.06652 18.097512000000002 4.548C17.42676 3.490512 16.535712 2.554416 15.493968 1.81284C14.102544 0.82236 12.640344 0.26952000000000004 10.824 0.04716C10.5468 0.013248000000000001 9.287376 -0.0017039999999999998 8.976 0.025248000000000003M9.576 1.505448C7.5559199999999995 1.559496 5.558256 2.3873040000000003 4.117368 3.767424C2.592528 5.227944 1.727472 7.022880000000001 1.5338640000000001 9.12804C1.498392 9.513672000000001 1.5191999999999999 10.544616 1.5695519999999998 10.896C1.711248 11.885088 1.974096 12.711744 2.435712 13.620000000000001C2.84736 14.43 3.3657600000000003 15.133704000000002 4.00284 15.74736C5.455488000000001 17.146608 7.15176 17.91408 9.197087999999999 18.097512000000002C9.6048 18.134088 10.45692 18.114864 10.86 18.060024C12.26952 17.868192 13.628808 17.322408000000003 14.751768000000002 16.497336C15.56436 15.900336000000001 16.35216 15.038447999999999 16.899192000000003 14.148C18.127368 12.148776 18.450072000000002 9.664344 17.77188 7.429032C17.507687999999998 6.55824 17.032896 5.598936 16.52412 4.908C15.670344000000002 3.74856 14.477088 2.78928 13.167504 2.20956C12.073056 1.725048 10.787544 1.4730480000000001 9.576 1.505448" stroke="none" fill="currentColor" fillRule="evenodd" />  
                                </svg>
                                <input className="focus:border-red-400 focus:border-solid focus:border-[2px] block w-full h-[calc(2.5rem+2px)] pl-10 p-[1.5rem_0.75rem] text-base font-normal leading-[1.5] text-[#495057] bg-white 
                                    bg-clip-padding border-[1px] max-sm:border-[1px] border-[#c5ccd3] rounded-[3px] shadow-[inset_0_1px_1px_rgba(51,51,51,.075)] transition-[border-color,box-shadow] 
                                    duration-150 ease-in-out outline-none" placeholder="Search services or describe problem"/>
                            </div>

                            {/* Services Tap */}
                            <div className="flex flex-row flex-wrap items-center">
                            { tab == 1 ? 
                                <div className="flex-auto relative">
                                    <div className="absolute top-0 w-full h-[5px] bg-[#e83c79]"></div>
                                    <div className="flex justify-center items-center px-[24px] py-[16px] border-l-[#e5e8ed] border-l-[1px] border-white bg-white border-solid border-y-[1px] text-black font-bold text-[15px]">Popular</div> 
                                </div>
                                :        
                                <div className="flex-auto relative" onClick={() => handleSetTap(1)} onMouseEnter={()=>sethover1(true)} onMouseLeave={()=>sethover1(false)}>
                                    {hover1 ? <div className="absolute top-0 w-full h-[5px] bg-[#009ed5]"></div> : <></>}
                                    <div className="flex justify-center items-center px-[24px] py-[16px] border-[#e5e8ed] bg-[#f8f9fc] border-solid border-[1px] text-[#009ed5] text-[15px] font-bold cursor-pointer">Popular</div>
                                </div>                         
                            }
                            { tab == 2 ? 
                                <div className="flex-auto relative">
                                    <div className="absolute top-0 w-full h-[5px] bg-[#e83c79]"></div>
                                    <div className="flex justify-center items-center px-[24px] py-[16px] w-full border-r-[#e5e8ed] border-white bg-white border-solid border-r-[1px] border-y-[1px] text-black font-bold text-[15px]">Browse by Category</div> 
                                </div>
                                :     
                                <div className="flex-auto relative" onClick={() => handleSetTap(2)} onMouseEnter={()=>sethover2(true)} onMouseLeave={()=>sethover2(false)}>
                                    {hover2 ? <div className="absolute top-0 w-full h-[5px] bg-[#009ed5]"></div> : <></>}
                                    <div className="flex justify-center items-center px-[24px] py-[16px] w-full border-[#e5e8ed] bg-[#f8f9fc] border-solid border-[1px] text-[#009ed5] text-[15px] font-bold cursor-pointer">Browse by Category</div>
                                </div>                            
                            }
                            </div>
                            {/*Service Item*/}

                            <ServiceItem/>
                        </div>
                    </div>  
                    <div className="w-1/3 px-[8px] py-[40px] relative max-md:hidden"></div>  
                </div>
            </div> 

            <ServiceFooter/>
        </div>
    )
}