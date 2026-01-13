interface ProfileHeaderProps {
    name?: string;
    email?: string;
    initial?: string;
  }
  
  export default function ProfileHeader({ 
    name = "Vira", 
    email = "vira@example.com",
    initial = "V"
  }: ProfileHeaderProps) {
    return (
    //   <div className="bg-[#f5e6e8] px-4 py-8 md:py-12">
    <div className="px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-2xl md:text-3xl">
              {initial}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1e3a8a]">{name}</h2>
              <p className="text-gray-600 text-sm md:text-base">{email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }