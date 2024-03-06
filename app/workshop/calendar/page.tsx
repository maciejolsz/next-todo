export default function Page() {

  // returns client component
  return <div className={"main-content"}>
    <iframe
      src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FWarsaw&bgcolor=%23ffffff&mode=WEEK&title&src=bWFjaWVqb2xzekBnbWFpbC5jb20&src=bWFjaWVqLm9sc3pld3NraUBhbXN0ZXJkYW1zdGFuZGFyZC5jb20&src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300&color=%23D50000&color=%23009688"
      className={"border-0 w-full h-[600px]"}></iframe>
  </div>
}
