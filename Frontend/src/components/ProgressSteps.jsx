

const ProgressSteps = ({ step1, step2, step3 }) => {
      return (
            <div className="flex flex-wrap justify-center items-center gap-10 mt-8">
                  {/* Step Item */}
                  {[
                        { label: "Login", active: step1 },
                        { label: "Shipping", active: step2 },
                        { label: "Summary", active: step3 }
                  ].map((step, index) => (
                        <div key={index} className="flex items-center">
                              {/* Circle */}
                              <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-sm transition-all duration-300
                              ${step.active
                                          ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/30"
                                          : "border-gray-600 text-gray-500"
                                    }`}
                              >
                                    {step.active ? "✓" : index + 1}
                              </div>

                              {/* Label */}
                              <div className="ml-3">
                                    <p
                                          className={`text-sm font-semibold tracking-wide ${step.active ? "text-pink-300" : "text-gray-500" }`}
                                    >
                                          {step.label}
                                    </p>
                              </div>

                              {/* Line between steps */}
                              {index < 2 && (
                                    <div
                                          className={`w-10 h-1 mx-4 rounded-full transition-all duration-300 
                                                ${(index === 0 && step2) || (index === 1 && step3)
                                                      ? "bg-pink-500"
                                                      : "bg-gray-600"
                                                }`}
                                    />
                              )}
                        </div>
                  ))}
            </div>
      );
}

export default ProgressSteps