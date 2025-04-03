import "../sass/Searchdropdown.scss"

interface ISearchdropdownbox {
    isOpen:boolean,
    onClose:()=>void
}

export const Searchdropdownbox = ({ isOpen, onClose }:ISearchdropdownbox) => {
  




    return (
        <>
          {isOpen && (
            <>

              <div
                onClick={onClose}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 999,
                }}
                onMouseDown={(e) => e.stopPropagation()}
              />
              <div
                style={{
                  position: "absolute",
                  top: "32px",
                  right: "0",
                  width: "400px",
                  backgroundColor: "white",
                  zIndex: 1000,
                  borderRadius: "4px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  padding: "10px",
                  animation: "fadeSlideIn 0.5s ease-out",
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <p>Sökresultat visas här!</p>
                <p>Sökresultat visas här!</p>
                <p>Sökresultat visas här!</p>
                <p>Sökresultat visas här!</p>
                <p>Sökresultat visas här!</p>
                <p>Sökresultat visas här!</p>
              </div>
            </>
          )}
        </>
    
      )
    };
