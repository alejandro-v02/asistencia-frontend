
import InstructorHeader from "../molecules/InstructorHeader";
import ReportsGenerator from "../organisms/ReportsGenerator";

const instructorMock = {
    nombre: "......",
    documento: "123456789", 
    
};

export default function ReportesInstructor() {
    return (
        <div className="space-y-6">
            <InstructorHeader instructor={instructorMock} />
            <ReportsGenerator />
        </div>
    );
}
