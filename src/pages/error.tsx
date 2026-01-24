
import { Link} from 'react-router-dom';

const Error = () =>{
    return (
        <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-orange-100">An Error has occured in your page</p>
            <p className="mt-6 text-base leading-7 text-gray-600">This is a technical issue, kindly reach out to the technical team to fix it</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                to="/"
                className="rounded-md bg-orange-100 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm "
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    )
}

export default Error
