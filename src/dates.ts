export const relativeDateFormatter = new Intl.RelativeTimeFormat();

// const dateDivisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
//     { amount: 60, name: 'seconds' },
//     { amount: 60, name: 'minutes' },
//     { amount: 24, name: 'hours' },
//     { amount: 7, name: 'days' },
//     { amount: 4.34524, name: 'weeks' },
//     { amount: 12, name: 'months' },
//     { amount: Number.POSITIVE_INFINITY, name: 'years' },
// ];

// export const formatTimeAgo = (date: Date) => {
//     const now = new Date();
//     let duration = (date.getTime() - now.getTime()) / 1000;

//     for (let i = 0; i < dateDivisions.length; i++) {
//         const division = dateDivisions[i];
//         if (Math.abs(duration) < division.amount) {
//             return relativeDateFormatter.format(Math.round(duration), division.name);
//         }
//         duration /= division.amount;
//     }
// };
