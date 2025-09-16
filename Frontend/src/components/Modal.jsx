
const Modal = ({ isOpen, onClose, children }) => {
      return (
            <>
                  {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

                              {/* Dim Background */}
                              <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out cursor-pointer"></div>

                              {/* Modal Container */}
                              <div className="relative bg-white dark:bg-[#1a1a1a] text-black dark:text-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-50 animate-fadeInUp border border-gray-200 dark:border-white/10">

                                    {/* Close Button */}
                                    <button
                                          onClick={onClose}
                                          aria-label="Close modal"
                                          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500 transition-transform hover:scale-110"
                                    >
                                          &times;
                                    </button>

                                    {/* Modal Content */}
                                    <div className="space-y-4 mt-4 text-center">
                                          {children}
                                    </div>
                              </div>
                        </div>
                  )}
            </>

      );
};

export default Modal;