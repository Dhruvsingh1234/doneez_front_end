'use client'

import { Rating } from '@smastrom/react-rating'

interface mechaniProps {
    mechanicName: string
    rating: number
    reviews: number
    distance?: number
    address: string
    zipcode: string
}

export default function MechanicItem({mechanicName, rating, reviews, distance, address, zipcode}:mechaniProps) {
    return (
        <>
            <div className="pt-8 px-4 pb-4 cursor-pointer hover:bg-slate-100">
                <h1 className="text-[#009ed5] text-4xl font-semibold max-md:text-2xl sm:text-xl">
                    {mechanicName}
                </h1>
                <div className="flex flex-row items-center">
                    <Rating
                        value={rating}
                        readOnly
                        halfFillMode="svg"
                        className="h-10 max-w-24"
                    />
                    <span className="text-[14px] font-medium text-[#2d2e2f] ml-2">
                        {rating}{" "} ({reviews})
                    </span>
                </div>
                <div className="text-[14px] text-[#2d2e2f]">
                    <span className="font-bold">{distance}{" "} mi</span>{" "} - {" "}{address} {" "} {zipcode}
                </div>
            </div>
            <div className="mt-4 mb-6 h-[1px] bg-[#e5e8ed] w-full"></div>
        </>
    );
}
