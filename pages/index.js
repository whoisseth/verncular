import Head from 'next/head'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeft } from 'react-icons/bs'
import moment from 'moment'
import { useState } from 'react'

const Home = ({ data }) => {
  const [time, setTime] = useState(data[0].available)
  const [dateIndex, setDateIndex] = useState(0)
  const [slotIndex, setSlotIndex] = useState(null)

  console.log(time)
  return (
    <div className="relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*  */}
      <nav className="flex items-center justify-between py-5 px-8 shadow-md md:shadow-none">
        <img
          src="/images/logo.png"
          className="z-50 w-[150px] cursor-pointer
          md:w-[180px]"
          alt=""
        />
        <div>
          <HiOutlineMenuAlt2 className="text-3xl text-sky-900 md:hidden" />
        </div>
      </nav>
      <Sidebar />
      <hr className=" hidden md:flex" />
      {/*  */}
      <main className="md:pl-72">
        <BsArrowLeft className="mx-8  mt-6 -mb-6 hidden text-lg md:flex" />
        <Heading />
        <SelectDate
          data={data}
          time={time}
          setTime={setTime}
          dateIndex={dateIndex}
          setDateIndex={setDateIndex}
          setSlotIndex={setSlotIndex}
        />
        <SelectSlot
          time={time}
          slotIndex={slotIndex}
          setSlotIndex={setSlotIndex}
        />
        <button className="mx-8 mt-6 rounded-md bg-sky-900 px-6 py-2 font-semibold  text-white">
          Proceed to Pay
        </button>
      </main>
    </div>
  )
}

function Heading() {
  return (
    <div className="mt-8 px-8">
      <h1 className=" text-2xl font-semibold capitalize">
        Book Demo session Slot
      </h1>
      <div className="mt-1 flex h-1 w-14 overflow-hidden rounded-full">
        <div className=" h-full w-full bg-sky-800" />
        <div className=" h-full w-full bg-red-500" />
      </div>
    </div>
  )
}
function SelectDate({
  data,
  setTime,
  time,
  dateIndex,
  setDateIndex,
  setSlotIndex,
}) {
  console.log(data)

  return (
    <div className="mt-6 pl-8">
      <h3 className="text-lg font-semibold">Select Date</h3>
      <div className=" mt-2 flex gap-2  overflow-x-auto">
        {data.map((data, index) => (
          <div
            key={index}
            onClick={() => {
              setTime(data.available)
              setDateIndex(index)
              setSlotIndex(null)
            }}
          >
            <DateBox
              className={
                dateIndex == index
                  ? 'bg-sky-800 text-white'
                  : 'bg-white text-sky-800'
              }
              time={time}
              day={moment(data.date).format('ddd')}
              date={moment(data.date).format('D')}
              month={moment(data.date).format('MMM')}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
function DateBox({ day, date, month, className }) {
  return (
    <button
      className={`flex  w-12 cursor-pointer flex-col items-center rounded border-2 border-sky-800 px-8 font-semibold  ${className}`}
    >
      <div>{day}</div>
      <div className="font-bold">{date}</div>
      <div>{month}</div>
    </button>
  )
}
function SelectSlot({ time, setSlotIndex, slotIndex }) {
  console.log(time[0].hour)
  return (
    <div className=" mt-8 px-8">
      <h3 className="text-lg font-semibold">Select Slot</h3>
      <div className="mt-2 flex gap-2">
        {time.map((time, index) => (
          <div key={index} onClick={() => setSlotIndex(index)}>
            <SlotBtn
              hours={time.hour}
              className={slotIndex == index ? 'bg-sky-800 text-white' : ''}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
function SlotBtn({ hours, className }) {
  return (
    <button
      className={
        'tex rounded-md border-2 border-sky-800 px-3 py-1.5 font-medium uppercase  ' +
        className
      }
    >
      {hours} pm - {hours + 1} pm
    </button>
  )
}
function Sidebar() {
  return (
    <div className="absolute  top-0 hidden h-screen flex-col gap-3 bg-gray-100 px-10 pt-16 md:flex">
      <button className="h-12 w-40 rounded-md bg-blue-400 font-semibold shadow-md">
        Home
      </button>
      <button className="h-12 w-40  rounded-md bg-blue-200 font-semibold shadow-md">
        Profile
      </button>
      <button className="h-12 w-40  rounded-md bg-blue-200 font-semibold shadow-md"></button>
      <button className="h-12 w-40  rounded-md bg-blue-200 font-semibold shadow-md"></button>
      <button className="h-12 w-40  rounded-md bg-blue-200 font-semibold shadow-md"></button>
      <button className="h-12 w-40  rounded-md bg-blue-200 font-semibold shadow-md"></button>
    </div>
  )
}
export default Home

export async function getStaticProps() {
  const res = await fetch(
    `https://mentorplus.s3.ap-south-1.amazonaws.com/config/availability.json`
  )
  const data = await res.json()

  return { props: { data } }
}
