const Footer = () => {
  return (
        <footer className="flex items-center justify-center h-16 bg-black/90 text-white">
            <div className="flex justify-between items-center px-4">                
                <div className="text-center">
                    © {new Date().getFullYear()} Coherte 3 - Sprint 5. Todos los derechos son reservados.
                </div>                
            </div>
        </footer>
    );
}

export default Footer
