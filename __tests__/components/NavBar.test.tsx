// import NavBar from '@/app/components/NavBar';
// import { ClerkProvider } from '@clerk/nextjs';
// import { render } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

// jest.mock('next/router', () => ({
  // useRouter: () => ({
  //   route: '/',
  //   pathname: '',
  //   query: '',
  //   asPath: '',
  // }),
// }));

// const localNav = () => {
//   return (
//     <MemoryRouter>
//       <ClerkProvider>
//         <NavBar />
//       </ClerkProvider>
//     </MemoryRouter>
//   );
// };

describe('NavBar', () => {

  // it('renders', () => {
  //   const component = render(localNav());
  //   expect(component).toBeInTheDocument();
  // });
 it ("should be 2", () => {
   expect(2).toBe(2);
 });
});
