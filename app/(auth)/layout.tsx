const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c92d2] to-[#f2fcfe]">
      <div className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        {children}
      </div>
    </div>
  )
}
export default AuthLayout