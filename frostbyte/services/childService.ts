export type AttendanceStatus = "present" | "expected" | "picked_up" | "absent";

export interface Child {
  id: string;
  name: string;
  image: any;
  attendance: AttendanceStatus;
}

const childrenData: Child[] = [
  { id: "1",  name: "Emma Johansen",         image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "2",  name: "Amalie Sanchez",        image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "3",  name: "Oliver Kristoffersen",  image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "4",  name: "Sophia Lindberg",       image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "5",  name: "Liam Mikkelsen",        image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "6",  name: "Ava Nygård",            image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "7",  name: "Mia Pedersen",          image: require("../assets/images/emma.png"), attendance: "present" },
  { id: "8",  name: "Isabella Rønning",      image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "9",  name: "Lucas Solberg",         image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "10", name: "James Ulsrud",          image: require("../assets/images/emma.png"), attendance: "expected" },
  { id: "11", name: "Hanne Viken",           image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "12", name: "Benjamin Wold",         image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "13", name: "Henry Aamodt",          image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "14", name: "Ella Dahl",             image: require("../assets/images/emma.png"), attendance: "picked_up" },
  { id: "15", name: "William Eide",          image: require("../assets/images/emma.png"), attendance: "absent" },
  { id: "16", name: "Mateo Iversen",         image: require("../assets/images/emma.png"), attendance: "absent" },
];

export class ChildService {
  static getAllChildren(): Child[] {
    return childrenData;
  }

  static getChildById(id: string): Child | undefined {
    return childrenData.find(child => child.id === id);
  }

  static getChildrenByStatus(status: AttendanceStatus): Child[] {
    return childrenData.filter(child => child.attendance === status);
  }

  static getAttendanceCounts() {
    const counts = {
      all: childrenData.length,
      present: 0,
      expected: 0,
      picked_up: 0,
      absent: 0,
    };

    childrenData.forEach(child => {
      counts[child.attendance]++;
    });

    return counts;
  }

  static updateChildAttendance(id: string, newStatus: AttendanceStatus): boolean {
    const child = childrenData.find(c => c.id === id);
    if (child) {
      child.attendance = newStatus;
      return true;
    }
    return false;
  }

  static addChild(child: Child): void {
    childrenData.push(child);
  }

  static removeChild(id: string): boolean {
    const index = childrenData.findIndex(c => c.id === id);
    if (index !== -1) {
      childrenData.splice(index, 1);
      return true;
    }
    return false;
  }
}