export default function snapshotToObject(snapshot){
    snapshot = Object.entries(snapshot);
    snapshot.map((data) => ({
      index: data[0],
      item: data[1]
    }));
}