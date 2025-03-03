import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import Data2 from "../components/Data2";


describe('Test suite for data2',()=>{
    beforeEach(()=>{
        global.fetch=jest.fn(); 
    });


    test('should rendering comp properly', async() => { 
        global.fetch.mockResolvedValueOnce({
            ok:true,
            json:async()=>({
               quotes:[
                {id:1,author:"Rumi"},
                {id:2,author:"Abdul Kalam"},
               ],
            }),

        });

        render(<Data2/>);

        await waitFor(()=>{
            expect(screen.getByText(/Rumi/i)).toBeInTheDocument();

        });
        await waitFor(()=>{
            expect(screen.getByText(/Abdul Kalam/i)).toBeInTheDocument();
        });


     });


     test('should delete quote', async() => {
        global.fetch.mockResolvedValueOnce({
            ok:true,
            json:async()=>({
                quotes:[
                    {id:1,author:"Rumi"},    ],
            }),

        });
        render(<Data2/>);
        await waitFor(()=>{
            expect(screen.getByText(/Rumi/i)).toBeInTheDocument();
        });

        const deleteButton=screen.getByText(/Delete Quote/i);
        fireEvent.click(deleteButton);

        await waitFor(()=>{
            expect(screen.queryByText(/Rumi/i)).not.toBeInTheDocument();
        });
       });

       test("should display loading state", async () => {
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ quotes: [] }),
        });
    
        render(<Data2 />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
      });
    
      test("should show error state when API fails", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Error in network"));
    
        render(<Data2 />);
    
        await waitFor(() => {
          expect(screen.getByText(/Error: Error in network/i)).toBeInTheDocument();
        });
      });


    //    test('should edit quote', async() => { 
    //     global.fetch.mockResolvedValueOnce({
    //         ok:true,
    //         json:async()=>({
    //             quotes:[{id:1,author:"Rumi"}], 
    //         }),
    //     });

    //     render(<Data2/>);

    //     await waitFor(()=>{
    //         expect(screen.getByText(/rumi/i)).toBeInTheDocument();
    //     });

    //     const editButton=screen.getByText(/edit/i);
    //     fireEvent.click(editButton);

        
    //    })













});