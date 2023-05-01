#include <iostream>
using namespace std;
template <typename T>

class pair{
    public:
    T x ; 
    T y ; 
    
    public:
    void setX(T a){
        x = a ; 
    }
    T getX(){
        return x ; 
    }
    
     void setY(T a){
        y = a ; 
    }
    
    T getY(){
        return y ; 
    }
   
};
template <typename T>
int main() 
{
  pair<int> obj;
  obj.setX(10) ; 
  obj.setY(20) ; 
  
  cout<<obj.getX<<" "<<obj.getY<<" "<<endl ;
  
  pair<int> obj2 ; 
  obj2.setY(3.123) ; 
  obj2.setX(19.12) ; 
  
  cout<<obj2.getX<<" "<<obj2.getY<<" "<<endl ;
  return 0 ; 
    
}