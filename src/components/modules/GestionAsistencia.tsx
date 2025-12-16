
import InstructorHeader from "../molecules/InstructorHeader";
import AttendanceEnabler from "../organisms/AttendanceEnabler";

const instructorMock = {
    nombre: "JHAN",
    documento: "123456789",
};

export default function GestionAsistencia() {
    return (
        <div className="space-y-6">
            <InstructorHeader instructor={instructorMock} />
            <AttendanceEnabler />
        </div>
    );
}
