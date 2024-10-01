import DashboardHeader from "../headers/DashBoardHeader/dashboardheader"

export default function Dashboard() {
    return(
        <div className="min-h-[100vh] bg-[#f4f6fa] min-w-full flex flex-col">
            <DashboardHeader/>

            <div className="mt-6 flex flex-col items-center w-full">
                <div className="max-w-[1280px] w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-md shadow-[0_2px_2px_0_rgba(224,226,230,.5)]"></div>
            </div>
        </div>
    )
}