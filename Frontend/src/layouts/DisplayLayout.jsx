import Layouts from './Layouts'

function DisplayLayout({children}) {
  return (
    <>
        <Layouts />
        <div>{children}</div>
    </> 
  );
}

export default DisplayLayout
