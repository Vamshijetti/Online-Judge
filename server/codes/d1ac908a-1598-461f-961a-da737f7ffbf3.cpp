#include <iostream>
#include <sstream>
#include<string>
using namespace std;

int main() {
    // Your C++ code here
    // cout << "Hello World!" << endl;
    string input;
    getline(cin, input);
    stringstream ss(intput);
    int a, b, c;
    char comma;
    ss >> a >> comma >> b >> comma >> c;
    cout << a + b + c << endl;
    return 0;
}